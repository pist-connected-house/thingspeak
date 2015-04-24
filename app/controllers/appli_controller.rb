class AppliController < ApplicationController
	before_filter :require_user
	skip_before_filter  :verify_authenticity_token
	
	layout 'login'

	def index
		render layout: "index"
	end

	def keyRegistrations
		render "keyRegistrations"
	end

	def configuration
		@channels = Array.new
		#@types = Array.new
		@fields = Array.new
		Association.all.each do |e|
			if (e.user_id != nil) & (e.user_id == current_user.id)
				channel = Channel.find(e.channel)
				@channels.push(channel)
				#@types.push(e.name)
				@fields.push(e.field)
			end
		end
		respond_to do |format|
      format.html {	render layout: "configuration" }
      format.json { render :json => {:channels => @channels, :fields => @fields} }
      format.xml { render :xml => @channel.not_social.to_xml(Channel.private_options) }
    end
	end

	def newchannel
		@message = Array.new
		@message.push("error")
		asso = Association.find_by key: params[:key]
		if asso
			if asso.user_id == nil
				asso.user_id = current_user.id
				#asso.channel = params[:type]
				asso.save
				@message[0] = "success"
			end
		else
			@message[0] = "absent"
		end
		respond_to do |format|
			format.json { render :json => @message }
		end
	end

	def editchannel
		@channels = Array.new
		@keys = Array.new
		@fields = Array.new
		@ids = Array.new
		Association.all.each do |e|
			if (e.user_id != nil) & (e.user_id == current_user.id)
				@keys.push(e.key)
				channel = Channel.find(e.channel)
				@channels.push(channel)
				@fields.push(e.field)
				@ids.push(e.id)
			end
		end
		respond_to do |format|
      format.html {	render layout: "configuration" }
      format.json { render :json => {:channels => @channels, :keys => @keys, :fields => @fields, :ids => @ids }}
      format.xml { render :xml => @channel.not_social.to_xml(Channel.private_options) }
    end
	end

	def update_key
		@message = Array.new
		@message.push("error")
		response.content_type = "application/json"
		asso = Association.find(params[:id])
		if asso
			if asso.user_id == current_user.id
				newasso = Association.find_by key: params[:key]
				if newasso
					if newasso.user_id == nil
						newasso.user_id = current_user.id
						newasso.key = params[:key]
						newasso.name = asso.name
						newasso.save
						asso.user_id = nil
						asso.save
						@message[0] = "success"
					elsif newasso.user_id != current_user.id
						@message[0] = "belongs1"
					else
						#if the new key is the same than the old one
						@message[0] = "nothing"
					end
				else
					@message[0] = "invalid"
				end
			else
				@message[0] = "belongs2"
			end
		end
		respond_to do |format|
			format.json {render :json => @message}
		end
	end

	def refresh
		asso = Association.find(params[:id])
		if asso
			respond_to do |format|
				format.json {render :json => {key: asso.key}}
			end
		else
			respond_to do |format|
				format.json {render :json => {key: "error"}}
			end
		end
	end

	def unbind_api
		@message = Array.new
		@message.push("error")
		response.content_type = "application/json"
		asso = Association.find(params[:id])
		if (asso.user_id == current_user.id)
			asso.user_id = nil
			asso.save
			@message[0] = "success"
		end
		respond_to do |format|
			format.json {render :json => @message}
		end
	end
	
	def destroy_session
		redirect_to "/appli/login"
	end

end