class Ticket < ApplicationRecord
  belongs_to :assignee, class_name: 'User', foreign_key: 'assignee_id', required: false
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id', required: false

  has_many :comments

  before_create :set_default_status
  before_create :set_default_priority

  private

  def set_default_status
    self.status = 'new'
  end

  def set_default_priority
    self.priority = 'unset'
  end
end
