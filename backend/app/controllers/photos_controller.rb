class PhotosController < ApplicationController
    before_action :find_photo, only: [:edit, :show, :update, :destroy]

    def index 
        @photos = Photo.all
        render json: @photos
    end

    def show
        render json: @photo
    end 

    def new
        @photo = Photo.new 
    end 

    def create
        @photo = Photo.new(photo_params)
        #if valid... 
        @photo.save 
        render json: @photos 
    end

    def update 
        @photo.update(photo_params)
        #if valid ... 
        render json: @photo
    end

    def destroy 
        @photo.destroy 
        render json: @photos 
    end

    private

    def photo_params 
        params.require(:photo).permit(:url, :like_count, :height, :width, :thumbnail)
    end

    def find_photo
        @photo = Photo.find(params[:id])
    end
end
