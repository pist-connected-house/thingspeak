class AddNameToAssociations < ActiveRecord::Migration
  def change
    add_column :associations, :name, :string
  end
end
