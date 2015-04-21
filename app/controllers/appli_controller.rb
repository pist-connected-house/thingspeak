class AppliController < ApplicationController
	before_filter :require_user

	def index
		render layout: "index"
	end

	def configuration
		@channels = Array.new
		AssociationElectricity.all.each do |e|
			if (e.user_id != nil) & (e.user_id == current_user.id)
				apikey = ApiKey.find(e.api_key_id)
				channel = Channel.find(apikey.channel_id)
				@channels.push(channel)
			end
		end
		respond_to do |format|
      format.html {	render layout: "configuration" }
      format.json { render :json => @channels }
      format.xml { render :xml => @channel.not_social.to_xml(Channel.private_options) }
    end
	end

	def newchannel
		@message = Array.new
		@message.push("error")
		ApiKey.all.each do |e|
			if e.api_key == params[:api_key]
				asso = AssociationElectricity.find(:all, :conditions => ["api_key_id = ?", e.id])
				asso.each do |k|
					if k.user_id == nil
						a = AssociationElectricity.find(k.id)
						a.user_id = current_user.id
						a.name = params[:type]
						a.save
						@message[0] = "success"
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
		AssociationElectricity.all.each do |e|
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
	

end