class AddPriorityToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :priority, :string
  end
end
