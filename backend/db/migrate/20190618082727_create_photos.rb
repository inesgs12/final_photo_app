class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :url
      t.integer :like_count
      t.integer :height
      t.integer :width
      t.string :thumbnail

      t.timestamps
    end
  end
end
