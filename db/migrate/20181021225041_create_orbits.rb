class CreateOrbits < ActiveRecord::Migration[5.1]
  def change
    create_table :orbits do |t|
      t.integer :planet_id
      t.integer :distance
      t.integer :location

      t.timestamps
    end
  end
end
