class AddSurafaceToPolygons < ActiveRecord::Migration
  def self.up
    add_column :polygons, :surface, :string
  end

  def self.down
    remove_column :polygons, :surface
  end
end
