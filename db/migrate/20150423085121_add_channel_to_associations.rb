class AddChannelToAssociations < ActiveRecord::Migration
  def change
    add_column :associations, :channel, :integer
  end
end
