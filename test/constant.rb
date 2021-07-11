class App
  include OAuth::Helpers

  DEVICES = [
    ANDROID = 'android'.freeze,
    IOS = 'ios'.freeze,
  ]

  APP_STORE = {
    IOS => 'iTunes',
    ROKU => 'Roku',
    ANDROID => 'Google Play',
  }.freeze

  PLATFORMS = {
    apple: 'apple',
    roku: 'roku',
    android: 'android',
    amazon: 'amazon',
  }.freeze

  APPLE = 'apple'.freeze
  ANDROID = 'android'.freeze

  serialize :metadata, HstoreSerializer

  attr_encrypted :details, key: ENV['ENCRYPTED_DETAILS_KEY'].first(32), marshal: true

  attr_accessible :store_id, :store_status, :store_version, :device_type, :has_in_app_billing

  has_one :api_key, foreign_key: 'application_id'

  has_many :in_app_purchases, foreign_key: 'oauth_application_id'

  belongs_to :site

  validates :uid, uniqueness: true

  before_validation :generate_name

  after_destroy :check_and_delete_iaps

  scope :deleted, -> { where(type: 'Doorkeeper::Application::Deleted') }

  def method_name
    puts ANDROID
  end

  private

  def generate_uid
    self.uid ||= UniqueToken.generate
  end
end
