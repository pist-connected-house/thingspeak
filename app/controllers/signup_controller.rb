class SignupController < Devise::RegistrationsController
	layout 'key_registrations'
	
	# use defaults from devise
	def new
		cookies[:sign_up] = { value: "XJ-122", expires: 1.hour.from_now }
		super
	end
	def edit; super; end
	def create; super; end
	
	
	def after_sign_up_path_for(resource)
		#cookies[:sign_up] = { value: "XJ-122", expires: 1.hour.from_now }

		return '/key_registrations'
	end


end