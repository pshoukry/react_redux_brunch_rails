class AddOwnerIdToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :owner_id, :integer
  end
end
