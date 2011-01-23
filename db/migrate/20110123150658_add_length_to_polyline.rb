class AddLengthToPolyline < ActiveRecord::Migration
  def self.up
    add_column :polylines, :length, :string
  end

  def self.down
    remove_column :polylines, :length
  end
end
