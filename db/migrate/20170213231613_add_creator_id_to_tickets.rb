class AddCreatorIdToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :creator_id, :integer
  end
end
