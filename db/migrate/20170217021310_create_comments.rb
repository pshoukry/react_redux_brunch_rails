class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :comment
      t.references :user, foreign_key: true
      t.references :ticket, foreign_key: true

      t.timestamps
    end
  end
end
