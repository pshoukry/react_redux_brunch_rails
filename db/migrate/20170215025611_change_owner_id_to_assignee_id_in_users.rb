class ChangeOwnerIdToAssigneeIdInUsers < ActiveRecord::Migration[5.0]
  def change
    rename_column :tickets, :owner_id, :assignee_id
  end
end
