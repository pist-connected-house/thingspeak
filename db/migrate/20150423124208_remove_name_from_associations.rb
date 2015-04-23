class RemoveNameFromAssociations < ActiveRecord::Migration
  def change
    remove_column :associations, :name, :string
  end
end
