require 'rails_helper'

RSpec.describe Ticket, type: :model do
  subject(:ticket) { create(:ticket) }

  context 'before create' do
    it 'sets default status to new' do
      expect(subject.status).to eq 'new'
    end

    it 'sets default priority to unset' do
      expect(subject.priority).to eq 'unset'
    end
  end
end
