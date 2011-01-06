class CreatePolylines < ActiveRecord::Migration
  def self.up
    create_table :polylines do |t|
      t.string :name
      t.text :description
      t.string :color
      t.integer :user_id
      t.string :data

      t.timestamps
    end
  end

  def self.down
    drop_table :polylines
  end
end
