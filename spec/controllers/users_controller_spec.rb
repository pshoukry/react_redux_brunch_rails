require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #current' do
    subject { response }
    before(:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end

    it 'returns current user' do
      get :current, format: :json
      id = JSON.parse(response.body)['id']
      expect(id).to eq @user.id
    end
  end

  describe 'PATCH #update/:id' do
    let(:attrs) { { role: 'admin'} }
    let!(:user) { create(:user) }

    before(:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end

    before(:each) do
      patch :update, params: { id: user.id, user: attrs }, format: :json
      user.reload
    end

    it { expect(user.role).to eq attrs[:role] }
  end

  describe 'GET #show' do
    before(:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end

    context 'when found' do
      subject { response }
      let(:user) { FactoryGirl.create(:user) }

      it 'returns http success' do
        get :show, params: { id: user.id }, format: :json
        is_expected.to have_http_status(:success)
      end
    end

    context 'when not found' do
      subject { response }

      it 'returns http 404' do
        get :show, params: { id: 1000 }, format: :json
        is_expected.to have_http_status(:not_found)
      end
    end
  end
end
