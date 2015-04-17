class RegistrationsController < Devise::RegistrationsController
  include KeyUtilities
  after_filter :add_api_key, :only => :create

  # use defaults from devise
  def new; super; end
  def edit; super; end
  def create; super; end
     def after_sign_up_path_for(resource)
		'/register_channels'
	end

  private

    # adds an api key to the new user
    def add_api_key
      @user = current_user
      if @user.present?
        @user.api_key = generate_api_key(16, 'user')
        @user.save
      end
    end

end

