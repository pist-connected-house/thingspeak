class ChangeKeyTypeInAssociations < ActiveRecord::Migration
  def self.up
    change_column :associations, :key, :string
  end
 
  def self.down
    change_column :associations, :key, :integer
  end
end
