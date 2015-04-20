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

	def new
	end
	

end