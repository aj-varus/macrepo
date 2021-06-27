using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;

namespace MatchGame
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private DispatcherTimer timer = new();
        private int tenthsOfSecondsElapsed;

        public MainWindow()
        {
            InitializeComponent();
            timer.Interval = TimeSpan.FromSeconds(.1);
            timer.Tick += (sender, args) =>
            {
                tenthsOfSecondsElapsed++;

                TimeTextBlock.Text = (tenthsOfSecondsElapsed / 10f).ToString("0.0s");

                if (matchesFound == 8)
                {
                    timer.Stop();
                    TimeTextBlock.Text = $"{TimeTextBlock.Text} Play again?";
                }
            };
            
            SetUpGame();

        }

        

        public void SetUpGame()
        {
            var animalEmoji = new List<string>
            {
                "🐉", "🐉",
                "💖", "💖",
                "💖", "💖",
                "💖", "💖",
                "💖", "💖",
                "💖", "💖",
                "💖", "💖",
                "💖", "💖"
            };

            var random = new Random();

            foreach (var textBlock in MainGrid.Children.OfType<TextBlock>())
            {
                if(textBlock == TimeTextBlock) continue;

                textBlock.Visibility = Visibility.Visible;
                var randomIndex = random.Next(animalEmoji.Count);
                textBlock.Text = animalEmoji[randomIndex];
                animalEmoji.RemoveAt(randomIndex);
            }

            timer.Start();
            tenthsOfSecondsElapsed = 0;
            matchesFound = 0;
        }

        TextBlock lastClickedTextBlock = new();
        bool match = false;
        private int matchesFound;
        private void textBlock4_Copy5_MouseDown(object sender, MouseButtonEventArgs e)
        {
            var textBlock = sender as TextBlock;

            if (match == false)
            {
                textBlock.Visibility = Visibility.Hidden;
                lastClickedTextBlock = textBlock;
                match = true;
            }

            else if (textBlock.Text == lastClickedTextBlock.Text)
            {
                textBlock.Visibility = Visibility.Hidden;
                match = false;
                matchesFound++;
            }

            else
            {
                lastClickedTextBlock.Visibility = Visibility.Visible;
                match = false;
            }


        }

        private void TimeTextBlock_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (matchesFound == 8)
            {
                SetUpGame();
            }
        }
    }
}
