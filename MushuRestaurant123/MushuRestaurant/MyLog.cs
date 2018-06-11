using System;
using System.IO;
using System.Text;

namespace MushuRestaurant
{
    public static class MyLog
    {
        public static void Write(string method, string data, string error = "")
        {
            string myDoc = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            if (!File.Exists($"{myDoc}\\log.txt"))
            {
                FileStream bufStream = File.Create($"{myDoc}\\log.txt");
                bufStream.Close();
            }

            //Stream stream = new FileStream($"{myDoc}\\log.txt", FileMode.Append);
            //StreamWriter writer = new StreamWriter(stream, Encoding.UTF8);
            //writer.WriteLine("{0};{1};{2};{3}", DateTime.Now, method, data, error);
            //writer.Close();
            //stream.Close();
        }
    }
}