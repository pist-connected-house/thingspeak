class AppliController < ApplicationController
	layout 'index'

	def index
		render 'index'
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
	end
	

end