class CommentsController < ApplicationController
    before_action :find_comment, only: [:edit, :show, :update, :destroy]

    def index 
        @comments = Comment.all
        render json: @comments
    end

    def show
        render json: @comment
    end 

    def new
        @comment = Comment.new 
    end

    def create
        @comment = Comment.new(comment_params)
        #if valid...bla bla 
        @comment.save
        render json: @comments
    end

    def edit
        @comment.update(comment_params)
        #if valid.... 
        render json: @comment

    end

    def destroy
        @comment.destroy
        render json: @comments
    end

    private 

    def comment_params
        params.require(:comment).permit(:content, :user_id, :photo_id)
    end

    def find_comment
        @comment = Comment.find(params[:id])
    end
end
