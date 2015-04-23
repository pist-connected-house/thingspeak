class RemoveColumn < ActiveRecord::Migration
  def change
    remove_column :associations, :name
  end
end
