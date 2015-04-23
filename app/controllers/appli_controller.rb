class AppliController < ApplicationController
	before_filter :require_user
	skip_before_filter  :verify_authenticity_token

	def index
		render layout: "index"
	end

	def configuration
		@channels = Array.new
		@types = Array.new
		Association.all.each do |e|
			if (e.user_id != nil) & (e.user_id == current_user.id)
				apikey = ApiKey.find(e.api_key_id)
				channel = Channel.find(apikey.channel_id)
				@channels.push(channel)
				@types.push(e.name)
			end
		end
		respond_to do |format|
      format.html {	render layout: "configuration" }
      format.json { render :json => {:channels => @channels, :types => @types} }
      format.xml { render :xml => @channel.not_social.to_xml(Channel.private_options) }
    end
	end

	def newchannel
		@message = Array.new
		@message.push("error")
		ApiKey.all.each do |e|
			if e.api_key == params[:api_key]
				asso = Association.find(:all, :conditions => ["api_key_id = ?", e.id])
				asso.each do |k|
					if k.user_id == nil
						a = Association.find(k.id)
						a.user_id = current_user.id
						a.name = params[:type]
						a.save
						@message[0] = "success"
					else
						@message[0] = "error"
					end
				end
			end
		end
		respond_to do |format|
			format.json { render :json => @message }
		end
	end

	def editchannel
		@channels = Array.new
		@api_keys = Array.new
		Association.all.each do |e|
			if (e.user_id != nil) & (e.user_id == current_user.id)
				apikey = ApiKey.find(e.api_key_id)
				@api_keys.push(apikey.api_key)
				channel = Channel.find(apikey.channel_id)
				@channels.push(channel)
			end
		end
		respond_to do |format|
      format.html {	render layout: "configuration" }
      format.json { render :json => {:channels => @channels, :api_keys => @api_keys }}
      format.xml { render :xml => @channel.not_social.to_xml(Channel.private_options) }
    end
	end

	def update_api
		response.content_type = "text/plain"
		key = ApiKey.find(params[:id])
		key.api_key = params[:api_key]
		name = params[:name]
		channel = Channel.find(key.channel_id)
		channel.name = name
		k = Association.find_by api_key_id: key.id
		if k && (k.user_id == current_user.id)
			channel.save
			key.save
			render :text => "API key updated."
		else
			render :text => "You are not allowed to update this API key."
		end
	end

	def unbind_api
		response.content_type = "text/plain"
		key = ApiKey.find(params[:id])
		k = Association.find_by api_key_id: key.id
		if (k.user_id == current_user.id)
			k.user_id = nil
			k.save
		end
		render :text => "API key unbound."
	end
	
	def destroy_session
		redirect_to "/appli/login"
	end

end