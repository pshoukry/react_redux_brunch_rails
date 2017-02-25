class AddStatusToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :status, :string
  end
end
