class AddTypeToAssociationElectricities < ActiveRecord::Migration
  def change
    add_column :association_electricities, :name, :string
  end
end
