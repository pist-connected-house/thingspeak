class AddSensorToAssociations < ActiveRecord::Migration
  def change
    add_column :associations, :sensor, :integer
  end
end
