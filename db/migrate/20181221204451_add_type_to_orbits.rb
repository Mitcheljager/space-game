class AddTypeToOrbits < ActiveRecord::Migration[5.1]
  def change
    add_column :orbits, :type, :integer
  end
end
