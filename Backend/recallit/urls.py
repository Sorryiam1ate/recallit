from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework import permissions
from users.views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
)
from users.views import ActivateUserView

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

from django.views.generic import TemplateView

from drf_spectacular.views import SpectacularSwaggerView

    
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

    path('activate/', ActivateUserView.as_view(), name='activate'),

    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),

    
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),  
    path("api/swagger/", TemplateView.as_view(template_name="swagger.html"), name="swagger-ui"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)