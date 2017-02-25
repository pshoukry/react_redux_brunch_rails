require 'rails_helper'

RSpec.describe HomeController, type: :controller do
  context 'when logged in' do

    before (:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end

    describe 'GET #index' do
      subject { response }

      it 'returns http success' do
        get :index
        is_expected.to have_http_status(:success)
      end
    end
  end

  context 'when logged out' do
    describe 'GET #index' do
      subject { response }
      it 'redirects to login page' do
        get :index
        is_expected.to redirect_to(new_user_session_url)
      end
    end
  end
end
