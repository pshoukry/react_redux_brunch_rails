require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#customer?' do
    it 'returns true if role is customer' do
      expect(subject.customer?).to be_falsy
      subject.role = 'customer'
      expect(subject.customer?).to be_truthy
    end
  end

  context 'when registering a new user' do
    subject(:user) { create(:user) }

    it 'defaults to role customer' do
      expect(user.customer?).to be_truthy
    end
  end
end
