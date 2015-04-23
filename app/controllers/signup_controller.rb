class SignupController < Devise::RegistrationsController
	layout 'login'
	
	# use defaults from devise
	def new; super; end
	def edit; super; end
	def create; super; end
	
	def after_sign_up_path_for(resource)
		'/key_registrations'
	end


end