class CreateAssociationElectricities < ActiveRecord::Migration
  def change
    create_table :association_electricities do |t|
      t.integer :user_id
      t.integer :api_key_id

      t.timestamps
    end
  end
end
