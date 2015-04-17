class AppliController < ApplicationController
	layout 'index'

	def index
		render 'index'
	end

	def configuration
		@channels = current_user.channels
	    respond_to do |format|
	      format.html
	      format.json { render :json => @channels.not_social.to_json(Channel.private_options) }
	      format.xml { render :xml => @channel.not_social.to_xml(Channel.private_options) }
	    end
	end
	

end