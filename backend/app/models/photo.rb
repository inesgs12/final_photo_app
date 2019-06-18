class Photo < ApplicationRecord
    has_many :users, through: :comments
    has_many :comments
end
