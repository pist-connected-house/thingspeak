class RemoveTypeFromAssociationElectricities < ActiveRecord::Migration
  def change
    remove_column :association_electricities, :type, :string
  end
end
