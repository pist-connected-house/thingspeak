class DropAd < ActiveRecord::Migration
  def change
  end

  def up
    drop_table :ads
  end
end
