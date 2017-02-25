class Comment < ApplicationRecord
  belongs_to :user, required: false
  belongs_to :ticket, required: false
end
