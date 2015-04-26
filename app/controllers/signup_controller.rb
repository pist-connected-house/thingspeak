class SignupController < Devise::RegistrationsController
	layout 'key_registrations'
	
	# use defaults from devise
	def new; super; end
	def edit; super; end
	def create; super; end
	
	
	def after_sign_up_path_for(resource)
		return '/key_registrations'
	end


end