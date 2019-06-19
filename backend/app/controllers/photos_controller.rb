class PhotosController < ApplicationController
    def index 
        @photos = Photo.all
        render json: @photos, include: :comments
    end

    def show
        @photo = Photo.find(params[:id])
        render json: @photo
    end 

end
