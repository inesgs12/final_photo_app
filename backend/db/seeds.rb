# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Photo.all.destroy_all 
# Comment.all.destroy
# User.all.destroy_all

def seed_data
    response = RestClient.get("https://api.unsplash.com/photos/?client_id=97c297ec213474ef4fea1f6200b39c5f5af601fb096f74d091a42bac0fce9472&page=1&per_page=30")

    
    all_photos = JSON.parse(response)
    

    all_photos.each do |photo|
        one_photo = Photo.find_or_create_by(
            url:photo["urls"]["small"],
            width:photo["width"],
            height:photo["height"],
            like_count: 0,
            thumbnail: photo["urls"]["thumb"]
        )
    end
end

seed_data

10.times do 
    User.create(username: Faker::Name.name)
end

10.times do
    Comment.create(content: Faker::Lorem.sentence(3), photo_id:Photo.all.sample.id, user_id:User.all.sample.id)
end