import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

const FEATURED_PRODUCTS = [
  {
    id: 'audio-elite',
    name: 'Casque Audio Élite',
    price: '129,90 €',
    description: 'Bluetooth 5.3, ANC, autonomie 30h.',
    image:
      'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=80',
    tag: 'Best-seller',
  },
  {
    id: 'watch-pro',
    name: 'Montre Connectée Pro',
    price: '199,00 €',
    description: 'Suivi santé avancé & GPS intégré.',
    image:
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80',
    tag: 'Nouveauté',
  },
  {
    id: 'speaker-mini',
    name: 'Enceinte Nomade Mini',
    price: '59,90 €',
    description: 'Son 360° & résistance IP67.',
    image:
      'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80',
    tag: 'Édition limitée',
  },
];

const CATALOG_PRODUCTS = [
  {
    id: 'buds-lite',
    name: 'Écouteurs Buds Lite',
    price: '79,00 €',
    description: 'Charge rapide & réduction de bruit adaptative.',
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tablet-x',
    name: 'Tablette X 11"',
    price: '449,00 €',
    description: 'Écran 120Hz, 256 Go, stylet inclus.',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'camera-pocket',
    name: 'Caméra Pocket 4K',
    price: '349,00 €',
    description: 'Stabilisation gyroscopique & HDR10+.',
    image:
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'smart-home',
    name: 'Pack Maison Connectée',
    price: '229,00 €',
    description: 'Hub, ampoules et capteurs intelligents.',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gaming-pad',
    name: 'Manette Gaming Pad+',
    price: '69,90 €',
    description: 'Compatibilité multi-plateformes & rétroéclairage.',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
  },
];

const ProductCard = ({
  product,
  compact,
  isFavorite,
  onToggleFavorite,
  onPrimaryAction,
  onPreview,
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={[styles.card, compact && styles.cardCompact]}
    onPress={() => onPreview(product)}
  >
    <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>
        {product.tag ? <Text style={styles.tag}>{product.tag}</Text> : null}
      </View>
      <Text style={styles.price}>{product.price}</Text>
    </View>

    <Text style={styles.description} numberOfLines={compact ? 2 : 3}>
      {product.description}
    </Text>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={() => onPrimaryAction(product)}>
        <Text style={styles.buttonText}>Acheter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        onPress={() => onToggleFavorite(product.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.favoriteText, isFavorite && styles.favoriteTextActive]}>
          {isFavorite ? '♥ Favori' : '♡ Favori'}
        </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default function App() {
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState({});
  const [lastAction, setLastAction] = useState('');
  const cartCount = useMemo(
    () => Object.values(cart).reduce((total, quantity) => total + quantity, 0),
    [cart],
  );

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        setLastAction('Produit retiré des favoris');
      } else {
        next.add(productId);
        setLastAction('Produit ajouté aux favoris');
      }
      return next;
    });
  };

  const handleBuy = (product) => {
    setCart((prev) => {
      const next = { ...prev, [product.id]: (prev[product.id] || 0) + 1 };
      return next;
    });
    setLastAction(`"${product.name}" ajouté au panier`);
  };

  const handlePreview = (product) => {
    setLastAction(`Vous consultez ${product.name}`);
  };

  const renderCatalogItem = ({ item }) => (
    <ProductCard
      product={item}
      isFavorite={favorites.has(item.id)}
      onToggleFavorite={toggleFavorite}
      onPrimaryAction={handleBuy}
      onPreview={handlePreview}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={CATALOG_PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderCatalogItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>Produits phares</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  compact
                  isFavorite={favorites.has(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onPrimaryAction={handleBuy}
                  onPreview={handlePreview}
                />
              ))}
            </ScrollView>

            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Favoris : {favorites.size}</Text>
              <Text style={styles.statsText}>Panier : {cartCount} article(s)</Text>
            </View>

            <Text style={styles.sectionTitle}>Catalogue</Text>
          </>
        }
        ListFooterComponent={
          lastAction ? <Text style={styles.feedback}>{lastAction}</Text> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  horizontalList: {
    paddingBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
    paddingBottom: 16,
    width: '100%',
  },
  cardCompact: {
    width: 260,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6F00',
  },
  tag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6F00',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    paddingHorizontal: 20,
    paddingTop: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  favoriteButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  favoriteButtonActive: {
    borderColor: '#FF6F00',
    backgroundColor: 'rgba(255, 111, 0, 0.08)',
  },
  favoriteText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  favoriteTextActive: {
    color: '#FF6F00',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  statsText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  feedback: {
    marginTop: 24,
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
  },
});

