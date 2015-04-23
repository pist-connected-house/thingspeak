class SignupController < Devise::RegistrationsController
	layout 'login'
	
	# use defaults from devise
	def new; super; end
	def edit; super; end
	def create; super; end

	def signup
		render 'signup'
	end

end