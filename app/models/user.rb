class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :comments

  before_create :set_default_role

  def customer?
    role == 'customer'
  end

  def set_default_role
    self.role = 'customer'
  end
end
