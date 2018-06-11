using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MushuRestaurant.Startup))]
namespace MushuRestaurant
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
