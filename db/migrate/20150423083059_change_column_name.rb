class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :associations, :api_key_id, :key
  end
end
