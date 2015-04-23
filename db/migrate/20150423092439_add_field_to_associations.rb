class AddFieldToAssociations < ActiveRecord::Migration
  def change
    add_column :associations, :field, :integer
  end
end
