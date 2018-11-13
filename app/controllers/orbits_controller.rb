class OrbitsController < ApplicationController
  def index
    @orbits = Orbit.all
    render json: @orbits
  end

  def show
    @orbit = Orbit.where(planet_id: params[:id])
    render json: @orbit
  end
end
